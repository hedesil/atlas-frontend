export class AppConstants {
  public static get baseURL(): string { return "https://ec2-34-244-150-149.eu-west-1.compute.amazonaws.com:5000"; }
  public static get assetTypes(): Object[] {
    return [
      { name: "Web", value: 0 },
      { name: "App", value: 1 },
      { name: "Service", value: 2 }
    ]
  }
  public static get assetVisibilityTypes(): Object[] {
    return [
      { name: "Internet", value: 0 },
      { name: "Internal", value: 1 }
    ]
  }

  public static get grcValues(): number[] {
    return [
      0, 1, 2, 3, 4
    ]
  }

  public static get enviromentTypes(): Object[] {
    return [
      { name : "Premise" , value : 0},
      { name : "Cloud" , value : 1},
      { name : "Hybrid" , value : 2},
    ]
  }

  public static get statusTypes(): Object[] {
    return [
      { name : "On development" , value : 0},
      { name : "Production" , value : 1},
      { name : "To be decomissioned" , value : 2},
    ]
  }
}
export const atlas_url: string = 'https://localhost:5000';
