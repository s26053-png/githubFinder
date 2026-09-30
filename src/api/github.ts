import type { GithubUser, GithubRepo } from '../types/github';

const BASE_URL = 'https://api.github.com/users';

// 1. 유저 프로필 정보 가져오기
export async function fetchGithubUser(username: string): Promise<GithubUser> {
  const response = await fetch(`${BASE_URL}/${username}`);
  if (!response.ok) {
    throw new Error('존재하지 않는 유저입니다.');
  }
  return response.json();
}

// 2. 해당 유저의 최신 리포지토리 5개 가져오기
export async function fetchGithubRepos(username: string): Promise<GithubRepo[]> {
  const response = await fetch(`${BASE_URL}/${username}/repos?sort=updated&per_page=5`);
  if (!response.ok) {
    throw new Error('리포지토리 목록을 불러오지 못했습니다.');
  }
  return response.json();
}