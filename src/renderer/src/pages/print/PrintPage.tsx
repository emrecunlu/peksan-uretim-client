import styles from './Print.module.scss'
import Barcode from 'react-barcode'
import QRCode from 'react-qr-code'
import { useEffect, useState, useMemo } from 'react'
import { IProductLabel } from '@/utils/interfaces/ProductLabel'
import moment from 'moment'
import ProductionHelper from '@/utils/helpers/ProductionHelper'

const PrintPage = () => {
  const [result, setResult] = useState<IProductLabel>({} as IProductLabel)

  useEffect(() => {
    window.electron.ipcRenderer.on('print-label', (_, data: IProductLabel) => {
      setResult(data)
    })

    return () => {
      window.electron.ipcRenderer.removeAllListeners('print-label')
    }
  }, [])

  const generateCell = (colId: number) => {
    const leftHeaders: string[] = ['Code', 'Color', 'Date', 'Time']

    const getColumnValue = (index: number) => {
      let value = ''

      switch (index) {
        case 0:
          return (value = result.stokKodu)
        case 1:
          return (value = colId === 0 ? result?.renkAlt ?? '' : result?.renkUst ?? '')
        case 2:
          return (value = moment(result.date).format('DD.MM.YYYY'))
        case 3:
          return (value = moment(result.date).format('HH:mm'))
        default:
          return
      }

      return value
    }

    return (
      <>
        {leftHeaders.map((title, index) => {
          return (
            <tr key={index}>
              <td>{title}</td>
              <td>{colId === 0 ? getColumnValue(index) : ''}</td>
              <td>{colId === 1 ? getColumnValue(index) : ''}</td>
              <td></td>
              <td>
                {(index === 0 && (result?.logoDesc ?? '')) ||
                  (index === 1 && (result?.logoRenk ?? ''))}
              </td>
            </tr>
          )
        })}
      </>
    )
  }

  const getColId = useMemo(() => {
    const bottomTypes: string[] = ['01', '04']

    const isBottom = bottomTypes.includes(result.urunTip ?? '')

    return isBottom ? 0 : 1
  }, [result])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>
          {result.stokKodu} / {result.yapKod}
        </h1>
        <span>{result.stokAdi}</span>
        <div className={styles.headerBarcode}>
          <Barcode
            value={result.stokKodu ?? '' + result.yapKod ?? ''}
            displayValue={false}
            width={1}
            height={35}
          />
        </div>
      </div>
      <div className={styles.productionType}>
        <h1>{ProductionHelper.getProductionName(result.uretTip ?? 0).toUpperCase()}</h1>
      </div>
      <div className={styles.table}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Bottom</th>
              <th>Top</th>
              <th>Assembly</th>
              <th>Logo</th>
            </tr>
          </thead>
          <tbody>{generateCell(getColId)}</tbody>
        </table>
        <div className={styles.tableFooter}>
          <ul>
            <li>
              <h1>Quantity</h1>
              <span>{result.adet ?? 0}</span>
            </li>
            <li>
              <h1>Seal Type</h1>
              <span>{result.sealType ?? ''}</span>
            </li>
            <li>
              <h1>Gross Weight</h1>
              <span>{result.grossWeight ?? ''}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.codes}>
        <div className={styles.code}>
          <h1>Lot No</h1>
          <span>{result.lotNo ?? ''}</span>
          <QRCode value={result?.lotNo ?? ''} size={64} />
        </div>
        <div className={styles.code}>
          <h1>Seri No</h1>
          <span>{result.seriNo ?? ''}</span>
          <Barcode value={result.seriNo ?? ''} displayValue={false} width={1.2} height={70} />
        </div>
      </div>
    </div>
  )
}

export default PrintPage
