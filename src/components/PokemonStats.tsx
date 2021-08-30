import React, { ReactElement } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { IStats } from '../utils/types'
import 'react-circular-progressbar/dist/styles.css'
import './PokemonStats.scss'

interface Props {
  pokeStats: IStats[]
}

const PokemonStats = ({ pokeStats }: Props): ReactElement => {
  return (
    <div className='stats-container'>
      {pokeStats &&
        pokeStats.map((stat) => {
          return (
            <div className='stats-container__stat' key={stat.stat.name}>
              <CircularProgressbar
                value={stat.base_stat}
                text={`${stat.base_stat}%`}
                styles={buildStyles({ pathColor: '#519afb' })}
              />
              <p className='stats-container__name'>{stat.stat.name}</p>
            </div>
          )
        })}
    </div>
  )
}

export default PokemonStats
