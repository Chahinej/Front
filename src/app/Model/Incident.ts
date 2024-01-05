export interface Incident
{
    id: number;
    name:  String ;
  // localisation

  date : Date ;
  state: String ;
  danger_degree: String ;
  type:  String ;
  danger_zone: number ;
  description:   String ;
}
