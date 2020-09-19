import { Link, Typography } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { Container } from "./Container";

export const Footer = () => (
  <FooterContainer>
    <FooterItems>
      <Typography>
        Code{" "}
        <Link href="https://github.com/ksandin/ragnarok-boss-tracker">
          available on github
        </Link>
      </Typography>
      <Typography>
        Please{" "}
        <Link href="https://github.com/ksandin/ragnarok-boss-tracker/issues">
          report any issues
        </Link>
      </Typography>
    </FooterItems>
  </FooterContainer>
);

const FooterContainer = styled(Container)(({ theme }) => ({
  background: theme.palette.common.black,
  minHeight: "auto",
  [theme.breakpoints.down("xs")]: {
    padding: 0,
  },
}));

const FooterItems = styled.div(({ theme }) => ({
  [theme.breakpoints.down("xs")]: {
    padding: 16,
    "& > *:not(:first-child)": {
      marginTop: 10,
    },
  },
  [theme.breakpoints.up("sm")]: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));
