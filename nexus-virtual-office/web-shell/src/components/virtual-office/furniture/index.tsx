'use client'
import { memo } from 'react'
import type { Room } from '../office-config'
import { ReceptionFurniture } from './Reception'
import { ArchiveRoom, BillingRoom, MeetingRoom, PlanningRoom, SettingRoom, ShowroomRoom, TaskRoom, WorkspaceCluster } from './Office'
import { FtthRoom, MonitoringRoom, NocRoom, OpsRoom } from './Server'
import { AiStudio, PersonalOffice, PhotoStudio, VaultRoom } from './Studio'

export const Furniture = memo(function Furniture({ room }: { room: Room }) {
  switch (room.type) {
    case 'lobby':
      return <ReceptionFurniture accent={room.color} />
    case 'showroom':
      return <ShowroomRoom accent={room.color} />
    case 'noc':
      return <NocRoom />
    case 'ftth':
      return <FtthRoom />
    case 'monitoring':
      return <MonitoringRoom />
    case 'ops':
      return <OpsRoom />
    case 'archive':
      return <ArchiveRoom />
    case 'vault':
      return <VaultRoom accent={room.color} />
    case 'billing':
      return <BillingRoom accent={room.color} />
    case 'setting':
      return <SettingRoom />
    case 'ai':
      return <AiStudio accent={room.color} />
    case 'tasks':
      return <TaskRoom />
    case 'planning':
      return <PlanningRoom />
    case 'personal':
      return <PersonalOffice accent={room.color} />
    case 'photo':
      return <PhotoStudio />
    case 'meeting':
      return <MeetingRoom />
    default:
      return <WorkspaceCluster accent={room.color} />
  }
})

export { MATS } from './materials'
