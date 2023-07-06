export interface IProductLabel {
	title: string;
	stockName: string;
	lotNo: string;
	serialNo: string;
	quantity: number;
	sealType: string;
	grossWeight: number;
	exCode: string;
	productType: string;
	bodyDetail: IProductLabelRow;
	topDetail: IProductLabelRow;
	assemblyDetail: IProductLabelRow;
	logoDetail: IProductLabelRow;
}

interface IProductLabelRow {
	stockCode: string;
	color: string;
	date: string;
	time: string;
}
