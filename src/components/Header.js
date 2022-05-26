import { Switch, Tooltip, tooltipClasses } from "@mui/material";
import styled from "styled-components";

const Title = styled.h2 `
    font-size: 2.6rem;
    font-weight: 700;
    line-height: 3.6rem;
`
const Container = styled.div `
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    pading: 3.2rem 1.6rem 1.6rem;
    background: #FFF;
`
const CustomizedToolTip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: 13
  },
}));

const label = { inputProps: { 'aria-label': 'Toggle dark mode' } };
export default function Header(props) {
    return (
      <Container>
          <Title>{props.title}</Title>
          <CustomizedToolTip title="Toggle dark mode" arrow>
              <Switch {...label} />
          </CustomizedToolTip>
      </Container>
    )
}