import styled, { css } from "styled-components";

type Props = {
  visible?: boolean
}

export const CheckBox = styled.input<Props>`
  ${props => props.visible ? css`
    display: block;
  ` : css`
    display: none;
  `}

  .item:hover & {
    display: block;
  }
`

export const Owner = styled.p<Props>`
  ${props => props.visible ? css`
    display: none;
  ` : css`
    display: block;
  `}

  .item:hover & {
    display: none;
  }
`