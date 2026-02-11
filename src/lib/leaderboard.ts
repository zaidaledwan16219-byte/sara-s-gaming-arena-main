import { PlayerScore, TeamScore } from './types';

const PLAYER_KEY = 'sara_game_player_scores';
const TEAM_KEY = 'sara_game_team_scores';

export function getPlayerScores(gameId?: string): PlayerScore[] {
  const data = JSON.parse(localStorage.getItem(PLAYER_KEY) || '[]');
  if (gameId) return data.filter((s: PlayerScore) => s.gameId === gameId);
  return data;
}

export function savePlayerScore(score: PlayerScore) {
  const scores = getPlayerScores();
  scores.push(score);
  scores.sort((a, b) => b.score - a.score);
  localStorage.setItem(PLAYER_KEY, JSON.stringify(scores.slice(0, 100)));
}

export function getTeamScores(gameId?: string): TeamScore[] {
  const data = JSON.parse(localStorage.getItem(TEAM_KEY) || '[]');
  if (gameId) return data.filter((s: TeamScore) => s.gameId === gameId);
  return data;
}

export function saveTeamScore(score: TeamScore) {
  const scores = getTeamScores();
  scores.push(score);
  localStorage.setItem(TEAM_KEY, JSON.stringify(scores.slice(0, 100)));
}

export function getAllTopPlayers(): PlayerScore[] {
  return getPlayerScores().sort((a, b) => b.score - a.score).slice(0, 10);
}
