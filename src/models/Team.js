export default class Team {
  constructor(team = {}) {
    this.id = team.id || null;
    this.name = team.name || "";
    this.opponents = team.opponents || [];
    this.totalPoints = team.totalPoints || 0;
    this.totalScoredGoals = team.totalScoredGoals || 0;
    this.totalLostGoals = team.totalLostGoals || 0;
    this.matches = team.matches || 0;
    this.wins = team.wins || 0;
    this.losses = team.losses || 0;
    this.draws = team.draws || 0;
  }
}
