const Logo = ({ size = 256 }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 512 512'
    >
      <g
        style={{
          display: 'inline',
        }}
      >
        <path
          style={{
            display: 'inline',
            fill: '#fff8dc',
            fillOpacity: 1,
            strokeWidth: 0.999999,
          }}
          d='M-.08 255.802v-256h512v512h-512Z'
          transform='translate(.08 .198)'
        />
      </g>
      <g
        style={{
          display: 'inline',
        }}
      >
        <path
          style={{
            display: 'inline',
            fill: '#bada55',
            fillOpacity: 1,
            strokeWidth: 0.999999,
          }}
          d='M19.92 255.802v-236h472v472h-472Zm324 66.51v-113.49l44.75-.02h45.25v-53H271.109v53H278.92v227h65zm-138-140.01v-26.5h-17v53h17z'
          transform='translate(.08 .198)'
        />
      </g>
      <g
        style={{
          display: 'inline',
          mixBlendMode: 'normal',
        }}
      >
        <path
          style={{
            display: 'inline',
            fill: '#1b1b1b',
            fillOpacity: 1,
            strokeWidth: 0.999999,
          }}
          d='M19.92 255.802v-236h472v472h-472Zm324 66.5v-113.5h90v-53H271.108l-.188-33.5v-33.5h-163v52h98v15h-17v53h17.142l-.368 39.75c-.349 37.628-.485 40.099-2.548 46.292-4.27 12.822-11.531 20.246-23.086 23.606-7.469 2.17-23.55 1.452-31.394-1.404-8.672-3.158-18.845-10.44-27.067-19.376l-7.373-8.012-17.193 20.595c-9.457 11.328-17.444 21.248-17.75 22.045-.709 1.847 8.934 12.089 17.637 18.73 8.83 6.741 26.475 15.197 38 18.211 29.61 7.745 63.496 5.468 87.5-5.879 20.57-9.724 33.552-24.359 41.298-46.558 5.738-16.444 6.464-23.522 6.95-67.75l.442-40.25h7.81v227h65z'
          transform='translate(.08 .198)'
        />
      </g>
    </svg>
  )
}
export default Logo
