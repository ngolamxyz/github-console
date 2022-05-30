import { Link } from "react-router-dom"
import styled from "styled-components"

const StyledFooter = styled.div `
    padding: 1.6rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.05);
    .action {
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        span {
            display: block;
        }
    }
    svg {
        width: 2rem;
        height: 2rem;
    }
`
export default function Footer() {
    return (
        <StyledFooter>
            <div className="action">
                <Link to={"/"}>
                    <svg>
                        <use xlinkHref="/imgs/sprite.svg#lookup-icon"/>
                    </svg>
                    <span>Search</span>
                </Link>
            </div>
            <div className="action">
                <Link to={"/liked"}>
                    <svg>
                        <use xlinkHref="/imgs/sprite.svg#liked-icon"/>
                    </svg>
                    <span>Favorite</span>
                </Link>
            </div>
        </StyledFooter>
    )
}