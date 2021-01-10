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
  type: string;
}

