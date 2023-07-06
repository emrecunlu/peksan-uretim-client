import BottomButton from '@/components/buttons/BottomButton';
import { MdOutbox } from 'react-icons/md';
import { grey } from '@mui/material/colors';
import { useState } from 'react';
import ProducedPackagesModal from '@/components/modals/package/ProducedPackagesModal';

const UretilenKolilerButton = () => {
	const [dialog, setDialog] = useState<boolean>(false);

	return (
		<>
			<ProducedPackagesModal open={dialog} onClose={() => setDialog(false)} />
			<BottomButton
				onClick={() => setDialog(true)}
				sx={{ bgcolor: grey[800], '&:hover': { bgcolor: grey[600] } }}
				icon={<MdOutbox size={32} />}
			>
				ÜRETİLEN KOLİLER
			</BottomButton>
		</>
	);
};

export default UretilenKolilerButton;
