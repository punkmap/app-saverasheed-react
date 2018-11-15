import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { css } from "react-emotion";

import LocationMap from ".";
import { pois } from "../../../fixtures/pois";
import muiTheme from "../../../theme";

const {
  palette: {
    tertiary: { main }
  }
} = muiTheme;

storiesOf("LocationMap", module).add("default", () => (
  <div className={css({ backgroundColor: main })}>
    <LocationMap
      push={action("push!")}
      entityClick={action("click!")}
      poisForQuest={pois}
    />
  </div>
));
