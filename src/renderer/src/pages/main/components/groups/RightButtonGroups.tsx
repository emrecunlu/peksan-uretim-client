import { RIGHT_MENU_WIDTH } from '@/utils/constants';
import { Box } from '@mui/material';
import UretimButton from '../buttons/UretimButton';
import NumuneButton from '../buttons/NumuneButton';
import FireButton from '../buttons/FireButton';
import YarimKoliButton from '../buttons/YarimKoliButon';
import RenkGecisiButton from '../buttons/RenkGecisiButton';
import { useEmployee } from '@/store/features/employee';
import ProductionHelper from '@/utils/helpers/ProductionHelper';

const RightButtonGroups = () => {
	const { machine } = useEmployee();

	console.log(machine);

	return (
		<Box
			sx={{
				width: RIGHT_MENU_WIDTH,
				height: '100%',
				display: 'flex',
				gap: 2,
				flexDirection: 'column',
				p: 2,
			}}
		>
			<UretimButton />
			<NumuneButton />
			<FireButton />
			<YarimKoliButton />
			{!ProductionHelper.isMontage(machine?.description2 ?? '') && (
				<RenkGecisiButton />
			)}
		</Box>
	);
};

export default RightButtonGroups;
