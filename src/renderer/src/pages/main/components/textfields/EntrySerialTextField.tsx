import { TextField, InputAdornment } from '@mui/material';
import { useState } from 'react';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { useEmployee } from '@/store/features/employee';
import store from '@/store';
import { fetchAssemblySerial } from '@/store/features/assembly';

const EntrySerialTextField = () => {
	const [value, setValue] = useState<string>('');

	const { workOrder } = useEmployee();

	const handleKeydown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (value !== '' && e.code === 'Enter') {
			store.dispatch(
				fetchAssemblySerial({
					serialNo: value,
					workOrder: workOrder?.isemrino ?? '',
				})
			);

			setValue('');
		}
	};

	return (
		<TextField
			onKeyDown={handleKeydown}
			fullWidth
			value={value}
			placeholder="Lütfen seri okutunuz."
			onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
				setValue(e.target.value)
			}
			label="Seri Numarası"
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<DocumentScannerIcon />
					</InputAdornment>
				),
			}}
		/>
	);
};

export default EntrySerialTextField;
