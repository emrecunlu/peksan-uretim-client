import {
	IApiGetObjectResult,
	IApiPostObjectResult,
} from '@/utils/interfaces/ApiResult';
import { IMaterialBody } from '@/utils/interfaces/Material';
import { IGetSerialDto } from '@/utils/interfaces/dto/GetSerialDto';
import instance from '@/utils/services/ApiService';
import { AxiosResponse } from 'axios';

class AssemblyRepository {
	private static _uri: string = '/assembly';

	static async getAllSeries(workOrder: string) {
		const fullUrl: string = `${this._uri}/material?workOrder=${workOrder}`;
		return instance.get<
			IApiGetObjectResult<{
				bodyMaterials: IMaterialBody;
				topMaterials: IMaterialBody;
			}>
		>(fullUrl);
	}

	static async getSerial({ workOrder, serialNo }: IGetSerialDto) {
		const fullUrl: string = `${this._uri}`;

		return instance.post<
			IGetSerialDto,
			AxiosResponse<
				IApiPostObjectResult<{
					bodyMaterials: IMaterialBody;
					topMaterials: IMaterialBody;
				}>
			>
		>(fullUrl, { workOrder, serialNo });
	}
}

export default AssemblyRepository;
