export type Team = 'home' | 'away';

export interface PlayerStats {
    points1: number;
    points2: number;
    points3: number;
    fouls: number;
    rebounds: number;
    assists: number;
    steals: number;
    turnovers: number;
    technicalFouls: number;
    unsportingFouls: number;
}

export interface Player extends PlayerStats {
    id: string;
    number: number;
    name: string;
    team: Team;
}

export interface CourtCoordinates {
    row: number;
    col: number;
}

export interface PlayEvent {
    id?: string; // Para edición
    timestamp: string; // "minuto X cuarto Y"
    quarter: number;
    minute: number;
    second: number;
    playerId: string;
    playerName: string;
    playerNumber: number;
    team: Team;
    action: 'points1' | 'points2' | 'points3' | 'foul' | 'technical_foul' | 'unsporting_foul' | 'rebound' | 'assist' | 'steal' | 'turnover';
    teamStats: TeamStats;
    coordinates?: CourtCoordinates; // Posición en la cancha
}export interface TeamStats {
    totalPoints: number;
    totalFouls: number;
    field1Points: number;
    field2Points: number;
    field3Points: number;
    totalRebounds: number;
    totalAssists: number;
    totalSteals: number;
    totalTurnovers: number;
}

export interface GameStats {
    homeTeam: TeamStats;
    awayTeam: TeamStats;
    events: PlayEvent[];
    currentQuarter: number;
    currentTime: { minute: number; second: number };
}
