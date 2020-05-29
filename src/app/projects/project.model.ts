import { Ingredient } from '../shared/ingredient.model';
import { OrganizationSummary } from '../organizations/organization.model';

export class Project {
  public id: string;
  public name: string;
  public description?: string;
  public platform: string = "web" || "ios" || "android" || "macos";
  public thumbnail?: string;
  public status: string = "active" || "archived";
  public organization: OrganizationSummary;
  public rem_preferences?: RemPreferences;
  public scene_url?: string;
  public created: number;
  public updated?: number;
  public number_of_members: number;
  public number_of_screens: number;
  public number_of_components: number;
  public number_of_text_styles: number;
  public number_of_colors: number;
  public number_of_spacing_tokens: number;
  public linked_styleguide: any = {id: ''};

}

export class RemPreferences {
  public status: string = "enabled" || "disabled" || "linked";
  public root_font_size: number;
  public use_for_font_sizes: boolean;
  public use_for_measurements: boolean;  
}
