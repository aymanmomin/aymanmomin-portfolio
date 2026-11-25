import { indiaStops } from './stops.india'
import { canadaStops, crossingStops } from './stops.canada'
import type { Stop } from './types'

export const stops: Stop[] = [...indiaStops, ...crossingStops, ...canadaStops]