import React from 'react';
import {useQuery} from 'react-query';
import {useCommitsFilters} from './useCommitsFilters';
import axios from "axios";


const transformCommit = (cmt) => {
  const {commit, sha, author: cmtAuthor} = cmt;

  const author = {
    name: commit.author.name,
    ...cmtAuthor
  }

  return {
    sha,
    author,
    date: commit.author.date,
    message: commit.message,
    isVerified: commit.verification.verified,
    url: commit.url
  }
}

function generateRequest({owner, repo, author, page, perPage}) {
  return {
    url: `https://api.github.com/repos/${owner}/${repo}/commits`,
    params: {
      page,
      author: author ? author : null,
      per_page: perPage
    }
  }
}

async function getCommits(query, filters) {
  const requestConfig = generateRequest({
    owner: query.owner,
    repo: query.repo,
    author: filters?.author,
    page: filters?.page,
    perPage: filters?.perPage
  });
  const results = await axios(requestConfig);
  return results;
}

export function useCommits() {
  const {filters, ...methods} = useCommitsFilters();
  const [queryKey, updateQueryKey] = React.useState(filters);

  const onChangeKey = () => {
    updateQueryKey(filters);
  };

  const commitsQuery = useQuery({
    queryKey: [`commits`, queryKey],
    queryFn: () => getCommits(queryKey.query, queryKey.filters),
    select: (data) => {
      return data.data.map((cmt) => transformCommit(cmt));
    },
    retry: false
  });

  return {
    ...methods,
    onSubmit: onChangeKey,
    filters,
    commitsQuery
  };
}
