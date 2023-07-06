import Barcode from 'react-barcode';

export default function LabelHeader() {
	return (
		<div className="label__header">
			<div className="label__title">
				<h1>032.021CSP31B / 676192093</h1>
			</div>
			<div className="label__subtitle">
				<span>
					32/21mm Çift Parça Çakma Pet Şişe Kapağo(İçten Yırtmalı)/32/21mm.. 2
					Pice Snap-on Closure For Pet Bottle(Tear-off Membrane)
				</span>
			</div>
			<div className="label__barcode">
				<Barcode
					value="032.021CSP31B / 676192093"
					displayValue={false}
					width={1}
					height={50}
				/>
			</div>
		</div>
	);
}
