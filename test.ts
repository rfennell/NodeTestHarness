import tl = require("azure-pipelines-task-lib/task");
import { PersonalAccessTokenCredentialHandler } from "typed-rest-client/Handlers";
import { IRequestHandler } from "azure-devops-node-api/interfaces/common/VsoBaseInterfaces";
import * as webApi from "azure-devops-node-api/WebApi";
import { IBuildApi } from "azure-devops-node-api/BuildApi";
import { Build, Change } from "azure-devops-node-api/interfaces/BuildInterfaces";
import { IReleaseApi } from "azure-devops-node-api/ReleaseApi";
import { IWorkItemTrackingApi } from "azure-devops-node-api/WorkItemTrackingApi";
import { throws } from "assert";
import fs  = require("fs");
import * as restm from "typed-rest-client/RestClient";
import { IRequestOptions } from "typed-rest-client/Interfaces";
import { GitCommit, GitPullRequest, GitPullRequestQueryType, GitPullRequestSearchCriteria, PullRequestStatus } from "azure-devops-node-api/interfaces/GitInterfaces";
import { WorkItemExpand, WorkItem, ArtifactUriQuery } from "azure-devops-node-api/interfaces/WorkItemTrackingInterfaces";
import { WebApi } from "azure-devops-node-api";

//import { IReleaseApi } from "azure-devops-node-api/ReleaseApi";
//import * as vstsInterfaces from "azure-devops-node-api/interfaces/common/VsoBaseInterfaces";

import { Release } from "azure-devops-node-api/interfaces/ReleaseInterfaces";

import { IGitApi } from "azure-devops-node-api/GitApi";
//import { IWorkItemTrackingApi } from "azure-devops-node-api/WorkItemTrackingApi";
import { ResourceRef } from "azure-devops-node-api/interfaces/common/VSSInterfaces";
//import { WorkItemExpand, WorkItem, ArtifactUriQuery } from "azure-devops-node-api/interfaces/WorkItemTrackingInterfaces";
//import { GitPullRequest, GitPullRequestQueryType } from "azure-devops-node-api/interfaces/GitInterfaces";

import {Client} from 'node-rest-client';


class BuildDetails {
    build: Build;
    commits: Change[];
    workitems: ResourceRef[];
    constructor ( build: Build, commits: Change[], workitems: ResourceRef[]) {
        this.build = build;
        if (commits) {
            this.commits = commits;
        } else {
            this.commits = [];
        }
        if (workitems) {
            this.workitems = workitems;
        } else {
            this.workitems = []
        }
   }
}


async function run (): Promise<string> {

    var promise = new Promise<string>(async (resolve, reject) => {

        try {
            let token: string = "<pat>>"; // bm-rf
            var teamProject = "GitHub"
            var buildDefId = 53;
            var org = "richardfennell";

            let authHandler = webApi.getPersonalAccessTokenHandler(token); 
            let instance = new webApi.WebApi(`https://dev.azure.com/${org}`, authHandler);
            var buildApi: IBuildApi = await instance.getBuildApi();
            var releaseApi: IReleaseApi = await instance.getReleaseApi();
            var workItemTrackingApi: IWorkItemTrackingApi = await instance.getWorkItemTrackingApi();


            let globalWorkItems = await buildApi.getWorkItemsBetweenBuilds(teamProject, 7797,7800);
            var workItemIds = globalWorkItems.map(wi => parseInt(wi.id));
            let fullWorkItems = [];
            if (workItemIds.length > 0) {
                var indexStart = 0;
                var indexEnd = (workItemIds.length > 200) ? 200 : workItemIds.length ;
                while ((indexEnd <= workItemIds.length) && (indexStart !== indexEnd)) {
                    var subList = workItemIds.slice(indexStart, indexEnd);
                    var subListDetails = await workItemTrackingApi.getWorkItems(subList, null, null, WorkItemExpand.Fields, null);
                    fullWorkItems = fullWorkItems.concat(subListDetails);
                    indexStart = indexEnd;
                    indexEnd = ((workItemIds.length - indexEnd) > 200) ? indexEnd + 200 : workItemIds.length;
                }
            }

            const handlebars = require("handlebars");
            const helpers = require("handlebars-helpers")({
                handlebars: handlebars
            });

            handlebars.registerHelper('json', function(context) {
                return JSON.stringify(context);
            });

            var tools = require(`c:/projects/github/NodeTestHarness/each_with_sort_by_field.js`);
                handlebars.registerHelper(tools);
 

            var template = fs.readFileSync("templatefile.md", "utf8").toString();

            var handlebarsTemplate = handlebars.compile(template);

            var output = handlebarsTemplate({
                "workItems": fullWorkItems
            });

             fs.writeFileSync("out.md", output);

            resolve (`Called API ${xxx.length} times`);
        } catch (err) {
            reject (err);
        }
       
    });
    return promise;
}

console.log("Started");
run()
.then((result) => {
    console.log(result);
})
.catch((err) => {
    console.log(err);
});
