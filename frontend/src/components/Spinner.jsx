import GridLoader from 'react-spinners/GridLoader'
import { css } from '@emotion/react'

const Loader = ({ loading }) => {
  const override = css`
    display: block;
    position: absolute;
    top: 12%;
    left: 16%;
    margin: 0 auto;
    border-color: #bada55;
  `

  return (
    <GridLoader loading={loading} css={override} color={'#bada55'} size={45} />
  )
}

export default Loader
