import React from 'react';
import { Box } from '@mui/material';
import RemainingList from '@/pages/main/components/remaining/RemainingList';
import ProductInputGroups from '@/pages/main/components/groups/ProductionInputGroups';
import SerialListGroup from './components/groups/SerialListGroup';
import { useEmployee } from '@/store/features/employee';
import ProductionHelper from '@/utils/helpers/ProductionHelper';

const MainPage: React.FC = () => {
	const { machine } = useEmployee();

	console.log(machine?.description2);

	return (
		<Box
			sx={{
				p: 2,
				flex: 1,
				display: 'flex',
				flexDirection: 'column',
				gap: 4,
			}}
		>
			<RemainingList />
			<Box sx={{ flex: 1, gap: 4, alignItems: 'center', display: 'flex' }}>
				<Box sx={{ display: 'flex', gap: 4, flexGrow: 1 }}>
					<ProductInputGroups />
					{ProductionHelper.isMontage(machine?.description2 ?? '') && (
						<Box
							sx={{
								height: '100%',
								flex: '1',
							}}
						>
							<SerialListGroup />
						</Box>
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default MainPage;
