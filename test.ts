import tl = require("azure-pipelines-task-lib/task");
import { IRequestHandler } from "azure-devops-node-api/interfaces/common/VsoBaseInterfaces";
import * as webApi from "azure-devops-node-api/WebApi";
import { IBuildApi } from "azure-devops-node-api/BuildApi";

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
            for (var build of builds) {
                console.log(`Getting the details of ${build.id}`);
                var buildCommits = await buildApi.getBuildChanges(teamProject, build.id);
                var buildWorkitems = await buildApi.getBuildWorkItemsRefs(teamProject, build.id);
            }

            resolve (`Called API ${1+(2*builds.length)} times`);
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
