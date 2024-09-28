const ctrlWrapper = (ctrl: (arg0: any, arg1: any, arg2: any) => any) => {
	const func = async (req: any, res: any, next: (arg0: unknown) => void) => {
		try {
			await ctrl(req, res, next);
		} catch (error) {
			next(error);
		}
	};
	return func;
};

export default ctrlWrapper;