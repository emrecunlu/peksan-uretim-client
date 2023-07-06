export default function LabelItemsTable() {
	return (
		<div className="items__table">
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
						<td>032.17CSP3-B</td>
						<td>032.12CTO-18</td>
						<td>032.021CSP31B</td>
						<td>-</td>
					</tr>
					<tr>
						<td>Color</td>
						<td>Sarı01/Yellow01</td>
						<td>Sarı01/Yellow01</td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td>Date</td>
						<td>09.06.2023</td>
						<td>20.06.2023</td>
						<td>032.021CSP31B</td>
						<td></td>
					</tr>
					<tr>
						<td>Time</td>
						<td>21:52</td>
						<td>11:47</td>
						<td>16:36</td>
						<td></td>
					</tr>
				</tbody>
			</table>
			<div className="table__footer">
				<div className="footer__item">
               <div  className="footer__key">BORE SEAL</div>
               <div className="footer__value">
                  <span>1</span>
               </div>
            </div>
			</div>
		</div>
	);
}
