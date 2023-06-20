import { Box, Stack } from '@mui/material';
import { useEffect } from 'react';
import EntrySerialTextField from '../textfields/EntrySerialTextField';
import { useEmployee } from '@/store/features/employee';
import AssemblyTable from '../table/AssemblyTable';
import { SerialType } from '@/utils/enums/SerialType';
import store from '@/store';
import { fetchAssemblySeries, useAssembly } from '@/store/features/assembly';

const SerialListGroup = () => {
	const { materials } = useAssembly();
	const { workOrder } = useEmployee();

	useEffect(() => {
		store.dispatch(fetchAssemblySeries(workOrder?.isemrino ?? ''));
	}, [store.dispatch]);

	return (
		<Box sx={{ flexGrow: 1, width: '100%' }}>
			<Stack direction="column" rowGap={2}>
				<EntrySerialTextField />
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						rowGap: 2,
					}}
				>
					<Stack direction="column" rowGap={2}>
						<AssemblyTable
							type={SerialType.top}
							data={materials?.topMaterials ?? null}
						/>
						<AssemblyTable
							type={SerialType.bottom}
							data={materials?.bodyMaterials ?? null}
						/>
					</Stack>
				</Box>
			</Stack>
		</Box>
	);
};

export default SerialListGroup;
