// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  import { Theme } from "@material-ui/core";

  export type DefaultTheme = Theme;
}
