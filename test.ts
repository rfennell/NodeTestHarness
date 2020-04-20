import tl = require("azure-pipelines-task-lib/task");
import { IRequestHandler } from "azure-devops-node-api/interfaces/common/VsoBaseInterfaces";
import * as webApi from "azure-devops-node-api/WebApi";
import { IBuildApi } from "azure-devops-node-api/BuildApi";
import { Build, Change } from "azure-devops-node-api/interfaces/BuildInterfaces";
import { throws } from "assert";
import fs  = require("fs");

//import { IReleaseApi } from "azure-devops-node-api/ReleaseApi";
//import * as vstsInterfaces from "azure-devops-node-api/interfaces/common/VsoBaseInterfaces";

//import { Release } from "azure-devops-node-api/interfaces/ReleaseInterfaces";

//import { IGitApi } from "azure-devops-node-api/GitApi";
//import { IWorkItemTrackingApi } from "azure-devops-node-api/WorkItemTrackingApi";
import { ResourceRef } from "azure-devops-node-api/interfaces/common/VSSInterfaces";
//import { WorkItemExpand, WorkItem, ArtifactUriQuery } from "azure-devops-node-api/interfaces/WorkItemTrackingInterfaces";
//import { GitPullRequest, GitPullRequestQueryType } from "azure-devops-node-api/interfaces/GitInterfaces";




class BuildDetails {
    build: Build;
    commits: Change[];
    workitems: ResourceRef[];
    constructor ( build: Build, commits: Change[], workitems: ResourceRef[]) {
        this.build = build;
        this.commits = commits;
        this.workitems = workitems;
   }
}

async function run (): Promise<string> {

    var promise = new Promise<string>(async (resolve, reject) => {

        try {
            let token: string = "<PAT>";
            var teamProject = "GitHub"
            var buildDefId = 53;
            var org = "richardfennell";

            let authHandler = webApi.getPersonalAccessTokenHandler(token); 
            let instance = new webApi.WebApi(`https://dev.azure.com/${org}`, authHandler);
            var buildApi: IBuildApi = await instance.getBuildApi();

            let builds = await buildApi.getBuilds( teamProject , [buildDefId]);
            console.log(`Found ${builds.length} builds`);
            var xxx: BuildDetails[] = [];

            for (var build of builds) {

                console.log(`Getting the details of ${build.id}`);
                var buildCommits = await buildApi.getBuildChanges(teamProject, build.id);
                var buildWorkitems = await buildApi.getBuildWorkItemsRefs(teamProject, build.id);

                xxx.push(new BuildDetails(build, buildCommits, buildWorkitems));

                break;
            }

            const handlebars = require("handlebars");
            const helpers = require("handlebars-helpers")({
                handlebars: handlebars
            });

            var template = fs.readFileSync("templatefile.md", "utf8").toString();

            var handlebarsTemplate = handlebars.compile(template);

            var output = handlebarsTemplate({
                "builds": xxx
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
