import styles from './Print.module.scss';
import Barcode from 'react-barcode';
import QRCode from 'react-qr-code';
import { useEffect, useState } from 'react';
import { IProductLabel } from '@/utils/interfaces/ProductLabel';
import LabelHelper from '@/utils/helpers/LabelHelper';
import moment from 'moment';

const PrintPage = () => {
	const [result, setResult] = useState<IProductLabel | null>(null);

	useEffect(() => {
		window.electron.ipcRenderer.on('print-label', (_, data: IProductLabel) => {
			console.log(data);
			setResult(data);
		});

		return () => {
			window.electron.ipcRenderer.removeAllListeners('print-label');
		};
	}, []);

	if (result == null) return null;

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>{result.title}</h1>
				<span>{LabelHelper.badStringToGood(result.stockName)}</span>
				<div className={styles.headerBarcode}>
					{/* stokKodu + yapKod */}
					<Barcode
						value={result.title}
						displayValue={false}
						width={1}
						height={35}
					/>
				</div>
			</div>
			<div className={styles.productionType}>
				<h1>{result.productType}</h1>
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
					<tbody>
						<tr>
							<td>Code</td>
							<td>{LabelHelper.emptyCharacter(result.bodyDetail.stockCode)}</td>
							<td>{LabelHelper.emptyCharacter(result.topDetail.stockCode)}</td>
							<td>
								{LabelHelper.emptyCharacter(result.assemblyDetail.stockCode)}
							</td>
							<td>{LabelHelper.emptyCharacter(result.logoDetail.stockCode)}</td>
						</tr>
						<tr>
							<td>Color</td>
							<td>{LabelHelper.emptyCharacter(result.bodyDetail.color)}</td>
							<td>{LabelHelper.emptyCharacter(result.topDetail.color)}</td>
							<td>{LabelHelper.emptyCharacter(result.assemblyDetail.color)}</td>
							<td>{LabelHelper.emptyCharacter(result.logoDetail.color)}</td>
						</tr>
						<tr>
							<td>Date</td>
							<td>{LabelHelper.emptyCharacter(result.bodyDetail.date)}</td>
							<td>{LabelHelper.emptyCharacter(result.topDetail.date)}</td>
							<td>
								{!LabelHelper.isEmpty(result.assemblyDetail.date)
									? moment(
											result.assemblyDetail.date,
											'DD.MM.YYYY HH:mm:ss'
									  ).format('DD.MM.YYYY')
									: ''}
							</td>
							<td>{LabelHelper.emptyCharacter(result.logoDetail.date)}</td>
						</tr>
						<tr>
							<td>Time</td>
							<td>{LabelHelper.emptyCharacter(result.bodyDetail.time)}</td>
							<td>{LabelHelper.emptyCharacter(result.topDetail.time)}</td>
							<td>
								{!LabelHelper.isEmpty(result.assemblyDetail.time)
									? moment(
											result.assemblyDetail.time,
											'DD.MM.YYYY HH:mm:ss'
									  ).format('HH:mm')
									: ''}
							</td>
							<td>{LabelHelper.emptyCharacter(result.logoDetail.time)}</td>
						</tr>
					</tbody>
				</table>
				<div className={styles.tableFooter}>
					<ul>
						<li>
							<h1>Quantity</h1>
							<span>{result.quantity}</span>
						</li>
						<li>
							<h1>Seal Type</h1>
							<span>{result.sealType}</span>
						</li>
						<li>
							<h1>Gross Weight</h1>
							<span>{result.grossWeight}</span>
						</li>
					</ul>
				</div>
			</div>
			<div className={styles.codes}>
				<div className={styles.code}>
					<h1>Lot No</h1>
					<span>{result.lotNo}</span>
					<QRCode value={result.lotNo} size={64} />
				</div>
				<div className={styles.code}>
					<h1>Seri No</h1>
					<span>{result.serialNo}</span>
					<Barcode
						value={result.serialNo}
						displayValue={false}
						width={1.2}
						height={70}
					/>
				</div>
			</div>
		</div>
	);
};

export default PrintPage;
