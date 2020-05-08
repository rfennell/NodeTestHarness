
{{#forEach this.workItems}}
{{#if isFirst}}### WorkItems with 'Tag 1'{{/if}}
{{#if (contains (lookup this.fields 'System.Tags') 'Tag 1')}}
*  **{{this.id}}**  {{lookup this.fields 'System.Title'}}
   - **WIT** {{lookup this.fields 'System.WorkItemType'}} 
   - **Tags** {{lookup this.fields 'System.Tags'}}
{{/if}}
{{/forEach}} 

{{#forEach this.workItems}}
{{#if isFirst}}### WorkItems with 'Tag 1' or 'TAG2'{{/if}}
{{#if (or (contains (lookup this.fields 'System.Tags') 'Tag 1') (contains (lookup this.fields 'System.Tags') 'TAG2'))}}
*  **{{this.id}}**  {{lookup this.fields 'System.Title'}}
   - **WIT** {{lookup this.fields 'System.WorkItemType'}} 
   - **Tags** {{lookup this.fields 'System.Tags'}}
{{/if}}
{{/forEach}} 

{{#forEach this.workItems}}
{{#if isFirst}}### WorkItems with 'Tag 1' and 'TAG2'{{/if}}
{{#if (and (contains (lookup this.fields 'System.Tags') 'Tag 1') (contains (lookup this.fields 'System.Tags') 'TAG2'))}}
*  **{{this.id}}**  {{lookup this.fields 'System.Title'}}
   - **WIT** {{lookup this.fields 'System.WorkItemType'}} 
   - **Tags** {{lookup this.fields 'System.Tags'}}
{{/if}}
{{/forEach}} 

#  Sort ID
{{#each_with_sort_by_field  this.workItems "System.Id"}}
{{#if isFirst}}### WorkItems {{/if}}
*  **{{this.id}}**  {{lookup this.fields 'System.Title'}}
   - **WIT** {{lookup this.fields 'System.WorkItemType'}} 
   - **Tags** {{lookup this.fields 'System.Tags'}}
{{/each_with_sort_by_field}} 

#  Sort title
{{#each_with_sort_by_field  this.workItems "System.Title"}}
{{#if isFirst}}### WorkItems {{/if}}
*  **{{this.id}}**  {{lookup this.fields 'System.Title'}}
   - **WIT** {{lookup this.fields 'System.WorkItemType'}} 
   - **Tags** {{lookup this.fields 'System.Tags'}}
{{/each_with_sort_by_field}} 


# Global
{{#forEach this.workItems}}
{{#if isFirst}}### WorkItems {{/if}}
*  **{{this.id}}**  {{lookup this.fields 'System.Title'}}
   - **WIT** {{lookup this.fields 'System.WorkItemType'}} 
   - **Tags** {{lookup this.fields 'System.Tags'}}
{{/forEach}} 

# ReleaseDetails  
{{json releaseDetails}}

# Default Build
{{json buildDetails}}

# Compared Release
{{json compareReleaseDetails}}
    
# Associated Pull Requests 
{{json pullRequests}}

# Builds with associated WI/CS 
{{json builds}}

# Global list of WI 
{{json  workItems}}

# Global list of CS 
{{json  commits}}


