import React, { ReactElement } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { IStats } from '../utils/types'
import 'react-circular-progressbar/dist/styles.css'
import './Stats.scss'

interface Props {
  stats: IStats[]
}

const Stats = ({ stats }: Props): ReactElement => {
  return (
    <div className='stats-container'>
      {stats &&
        stats.map((stat) => {
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

export default Stats
