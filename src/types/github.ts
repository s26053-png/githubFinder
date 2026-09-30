// 깃허브 유저 정보 타입
export interface GithubUser {
  login: string;          // 유저 아이디
  avatar_url: string;     // 프로필 이미지 주소
  name: string | null;    // 이름 (설정 안 한 경우 null 가능)
  bio: string | null;     // 자기소개
  public_repos: number;   // 공개 리포지토리 수
  followers: number;      // 팔로워 수
  following: number;      // 팔로잉 수
  html_url: string;       // 깃허브 프로필 페이지 링크
}

// 깃허브 리포지토리 정보 타입
export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number; // 별(Star) 개수
  html_url: string;
  language: string | null;  // 주 사용 언어
}