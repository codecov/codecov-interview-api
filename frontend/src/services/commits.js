import { getAPI, postAPI } from './index'

export const fetchCommits = (organization, repository) =>
    getAPI(
        `/api/repo/${organization}/${repository}/commits/`
    )

export const synchronizeRepository = (organization, repository) =>
    postAPI(
        `/api/repo/${organization}/${repository}/commits/sync`, {}
    )