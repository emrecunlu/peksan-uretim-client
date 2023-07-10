import { useAssembly } from '@/store/features/assembly';
import { SerialType } from '@/utils/enums/SerialType';
import { IMaterialBody } from '@/utils/interfaces/Material';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableContainer,
	TableRow,
	Paper,
	Typography,
	Box,
} from '@mui/material';
import { useMemo } from 'react';

type Props = {
	data: IMaterialBody | null;
	type: SerialType;
};

const AssemblyTable = ({ data, type }: Props) => {
	const { materials } = useAssembly();

	const totalAmount = useMemo(() => {
		return data?.data.reduce((prev, curr) => prev + curr.remaining, 0) ?? 0;
	}, [materials]);

	return (
		<Box
			component={Paper}
			sx={{ borderColor: 'grey.300', borderWidth: 1, borderStyle: 'solid' }}
		>
			<Typography
				sx={{ m: 2 }}
				variant="subtitle2"
				fontWeight="600"
				color="red"
			>
				{data?.description ?? ''} - {type}
			</Typography>
			<TableContainer component={Paper} sx={{ maxHeight: 190 }}>
				<Table
					sx={{
						'&.MuiTable-root 	.MuiTableCell-root': {
							p: 1,
						},
					}}
				>
					<TableHead>
						<TableRow>
							<TableCell>Seri Numarası</TableCell>
							<TableCell>Miktar</TableCell>
							<TableCell>Kalan</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data?.data.map((item, index) => (
							<TableRow
								sx={{
									'&.MuiTableRow-root:nth-of-type(2n+1)': {
										bgcolor: 'grey.200',
									},
								}}
								key={index}
							>
								<TableCell>{item.serialNo}</TableCell>
								<TableCell>{item.quantity}</TableCell>
								<TableCell>{item.remaining}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Typography
				sx={{ px: 1, py: 1 }}
				textAlign="right"
				variant="body1"
				color="red"
				fontWeight="600"
			>
				Toplam Kalan: {totalAmount} Adet
			</Typography>
		</Box>
	);
};

export default AssemblyTable;
