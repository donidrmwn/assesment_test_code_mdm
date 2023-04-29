import logo from './logo.svg';
import './App.css';
import TableData from './components/table';
import styled from 'styled-components'
import { ChartData } from './components/chart';
function App() {

  const Styles = styled.div`
    padding: 1rem;

    table {
      border-spacing: 0;
      border: 1px solid black;

      tr {
        :last-child {
          td {
            border-bottom: 0;
          }
        }
      }

      th,
      td {
        margin: 0;
        padding: 0.5rem;
        border-bottom: 1px solid black;
        border-right: 1px solid black;

        :last-child {
          border-right: 0;
        }
      }
    }
  `
  return (
    <>
      <Styles>
        <TableData />
        <ChartData />
      </Styles>
    
    </>
  );
}

export default App;
