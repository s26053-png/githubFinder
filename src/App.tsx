import { useState } from 'react';
import type { GithubUser, GithubRepo } from './types/github';
import { fetchGithubUser, fetchGithubRepos } from './api/github';

function App() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState<GithubUser | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError(null);
    setUser(null);
    setRepos([]);

    try {
      const [userData, repoData] = await Promise.all([
        fetchGithubUser(username),
        fetchGithubRepos(username),
      ]);
      setUser(userData);
      setRepos(repoData);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">🐙 GitHub Profile Finder</h1>

      {/* 검색 폼 */}
      <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-md mb-6">
        <input
          type="text"
          placeholder="GitHub Username 입력 (예: octocat)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="flex-1 p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer"
        >
          검색
        </button>
      </form>

      {/* 로딩 & 에러 메시지 */}
      {loading && <p className="text-slate-600 font-medium">불러오는 중...</p>}
      {error && <p className="text-red-500 font-semibold">{error}</p>}

      {/* 유저 결과 카드 */}
      {user && (
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
          <div className="flex items-center gap-4 mb-4">
            <img src={user.avatar_url} alt={user.login} className="w-16 h-16 rounded-full border" />
            <div>
              <h2 className="text-xl font-bold text-slate-800">{user.name || user.login}</h2>
              <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:underline text-sm"
              >
                @{user.login}
              </a>
            </div>
          </div>

          {user.bio && <p className="text-slate-600 mb-4 text-sm">{user.bio}</p>}

          <div className="flex justify-around bg-slate-50 p-3 rounded-lg mb-6 text-center text-sm">
            <div>
              <p className="font-bold text-slate-800">{user.public_repos}</p>
              <p className="text-slate-500 text-xs">Repos</p>
            </div>
            <div>
              <p className="font-bold text-slate-800">{user.followers}</p>
              <p className="text-slate-500 text-xs">Followers</p>
            </div>
            <div>
              <p className="font-bold text-slate-800">{user.following}</p>
              <p className="text-slate-500 text-xs">Following</p>
            </div>
          </div>

          {/* 리포지토리 목록 */}
          <h3 className="font-bold mb-3 text-slate-700">최신 리포지토리</h3>
          <ul className="space-y-2">
            {repos.map((repo) => (
              <li
                key={repo.id}
                className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition"
              >
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-blue-600 hover:underline block text-sm"
                >
                  {repo.name}
                </a>
                {repo.description && (
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">{repo.description}</p>
                )}
                <div className="flex gap-3 text-xs text-slate-400 mt-2">
                  {repo.language && <span>🏷️️ {repo.language}</span>}
                  <span>⭐ {repo.stargazers_count}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;