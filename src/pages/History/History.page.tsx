import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'
import { HistoryContainer, HistoryList, Status } from './History.styles'
import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
export default function History(): JSX.Element {
  const { cycles } = useContext(CyclesContext)

  function formatTimeDistance(date: Date): string {
    return formatDistanceToNow(date, {
      locale: ptBR,
      addSuffix: true
    })
  }
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 meses</td>
              <td>
                <Status statusColor="red">Concluído</Status>
              </td>
            </tr> */}
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} minutos</td>
                <td>{formatTimeDistance(cycle.startDate)}</td>
                <td>
                  {cycle.finishedDate != null ? (
                    <Status statusColor="green">Concluído</Status>
                  ) : cycle.interruptedDate != null ? (
                    <Status statusColor="red">Interrompido</Status>
                  ) : (
                    <Status statusColor="yellow">Em andamento</Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
