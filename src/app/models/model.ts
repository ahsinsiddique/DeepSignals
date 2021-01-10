export class User {
  first_name: string;
  last_name: string;
  role: string;
  token: string
}

export class Assessment {
  id: number;
  name: string;
  users_resolved: number;
  active: boolean;
  image_url: string;
}

export class AssessmentGraph {
  data:
    { Agreeableness: number; Drive: number; Luck: number; Openess: number };
  type: AssessmentChartType;
}

export class AdminUser {
  email: string;
  first_name: string
  groups: Array<string>;
  last_name: string;
}


export enum AssessmentChartType  {
  'LINE' = 'line',
  'BAR' = 'bar',
  'horizontalbar' = 'horizontalBar',
  'RADAR' = 'radar',
  'PIE' = 'pie',
  'POLARAREA' = 'polarArea',
  'SCATTER' = 'scatter'
}
