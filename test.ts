import tl = require("azure-pipelines-task-lib/task");
import { IRequestHandler } from "azure-devops-node-api/interfaces/common/VsoBaseInterfaces";
import * as webApi from "azure-devops-node-api/WebApi";
import {  IGitApi, GitApi } from "azure-devops-node-api/GitApi";
import { GitCommit, GitPullRequest, GitPullRequestQueryType, GitPullRequestSearchCriteria, PullRequestStatus } from "azure-devops-node-api/interfaces/GitInterfaces";
import { IBuildApi } from "azure-devops-node-api/BuildApi";

async function run (): Promise<string> {

    var promise = new Promise<string>(async (resolve, reject) => {

        try {
            let token: string = "<your pat>";
            var teamProject = "GitHub"
            var org = "richardfennell";
            var commitID = "b0fa863823f153861f7ba035273b82510be50054";


            let authHandler = webApi.getPersonalAccessTokenHandler(token); 
            let instance = new webApi.WebApi(`https://dev.azure.com/${org}`, authHandler);

            var gitApi: IGitApi = await instance.getGitApi();
            var filter: GitPullRequestSearchCriteria = {
                creatorId: "",
                includeLinks: true,
                repositoryId: "",
                reviewerId: "",
                sourceRefName: "",
                sourceRepositoryId: "",
                status: PullRequestStatus.Completed,
                targetRefName: ""
            };
            var allPullRequests: GitPullRequest[] = await gitApi.getPullRequestsByProject( teamProject, filter);
            console.log(allPullRequests.length);
           
            // this is the old logic 
            var matches = allPullRequests.filter(pr => pr.lastMergeCommit.commitId === commitID);
            console.log(matches.length);

            var m1: GitPullRequest[] = []
            allPullRequests.forEach(pr => {
                if (pr.lastMergeCommit) {
                    if (pr.lastMergeCommit.commitId === commitID) 
                    {
                        m1.push(pr);
                    }
                } else {
                    console.log(`PR ${pr.pullRequestId} does not have a lastMergeCommit`);
                }
            });

            console.log(m1.length);

            resolve (`End`);
            
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
