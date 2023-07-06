import AuthRepository from '@/repositories/AuthRepository';
import { login, useEmployee } from '@/store/features/employee';
import { IQuestion } from '@/utils/interfaces/Question';
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Container,
	ScopedCssBaseline,
	TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AiFillSave } from 'react-icons/ai';
import { BsFillHandThumbsUpFill, BsHandThumbsDownFill } from 'react-icons/bs';
import store from '@/store';

interface IAnswer {
	isClear: boolean;
	questionId: number;
	description: string | null;
}

const QuestionsPage = () => {
	const [questions, setQuestions] = useState<IQuestion[]>([]);
	const [area, setArea] = useState<boolean>(false);
	const [answers, setAnswers] = useState<IAnswer[]>([]);
	const [description, setDescription] = useState<string>('');
	const [step, setStep] = useState(0);

	const { employee, machine, workOrder } = useEmployee();
	const navigate = useNavigate();

	if (!employee || !machine || !workOrder) {
		return <Navigate to="/" />;
	}

	useEffect(() => {
		const fetchQuestions = async () => {
			const { data: results } = (await AuthRepository.getHygenieQuestions(1))
				.data;

			setQuestions(results);
		};

		fetchQuestions();
	}, []);

	const nextQuestion = async (isClear: boolean) => {
		const answer: IAnswer = {
			isClear,
			questionId: questions[step].soruId,
			description: isClear ? null : description,
		};

		setAnswers((answers) => [...answers, answer]);
		setDescription('');
		setArea(false);
		setStep((step) => step + 1);
	};

	const handleSubmit = async () => {
		const response = (
			await AuthRepository.sendQuestionsAnwers({
				machine: parseInt(machine.machineCode),
				staff: parseInt(employee.staffCode),
				hygiene: answers.map((answer) => ({
					clear: answer.isClear ? 1 : 0,
					desc: answer.description,
					question: answer.questionId,
				})),
			})
		).data;

		if (response.success) {
			store.dispatch(login());
			window.electron.ipcRenderer.send('connect-com-port', 'COM2');
			navigate('/');
		}
	};

	return (
		<ScopedCssBaseline>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					height: '100vh',
					bgcolor: (theme) => theme.palette.grey[100],
				}}
			>
				<Container maxWidth="lg">
					{questions.length > 0 && (
						<Card>
							<CardHeader
								title={
									questions.length === step
										? 'Lütfen bitir butonuna tıklayınız!'
										: questions[step].soru
								}
							></CardHeader>
							<CardContent>
								{area && (
									<Box sx={{ mb: 4 }}>
										<TextField
											value={description}
											onChange={(e) => setDescription(e.target.value)}
											autoFocus
											label="Açıklama"
											fullWidth
											multiline
											rows={5}
										/>
									</Box>
								)}
								{(area && (
									<Button
										startIcon={<AiFillSave />}
										disabled={description === ''}
										onClick={() => nextQuestion(false)}
										size="large"
										color="primary"
										variant="contained"
									>
										Kaydet
									</Button>
								)) || (
									<>
										{(questions.length === step && (
											<Button
												startIcon={<AiFillSave />}
												variant="contained"
												size="large"
												color="success"
												onClick={handleSubmit}
											>
												Bitir
											</Button>
										)) || (
											<>
												<Button
													onClick={() => nextQuestion(true)}
													variant="contained"
													size="large"
													color="secondary"
													startIcon={<BsFillHandThumbsUpFill />}
												>
													EVET
												</Button>
												<Button
													onClick={() => setArea(true)}
													sx={{ ml: 2 }}
													variant="contained"
													size="large"
													color="error"
													startIcon={<BsHandThumbsDownFill />}
												>
													HAYIR
												</Button>
											</>
										)}
									</>
								)}
							</CardContent>
						</Card>
					)}
				</Container>
			</Box>
		</ScopedCssBaseline>
	);
};

export default QuestionsPage;
