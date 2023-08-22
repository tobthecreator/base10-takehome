export const ProgressBar = ({
	steps,
	currentStep,
	milestoneSteps = [],
	className,
}: {
	steps: number;
	currentStep: number;
	milestoneSteps: number[];
	className?: string;
}) => {
	return (
		<div
			className={`w-full bg-slate-200 h-1 flex items-center rounded ${className}`}
		>
			{Array(steps)
				.fill("")
				.map((s, index) => {
					const existingStep = milestoneSteps.find(
						(step) => step === index + 1
					);

					const showMilestone = milestoneSteps.length > 0 && !!existingStep;

					const highlightMilestone =
						existingStep && existingStep <= currentStep;

					return (
						<>
							<div className="bg-transparent h-1 rounded-l flex items-center overflow-visible w-full">
								<div
									className={`bg-cuda-${
										index + 1 <= currentStep ? "500" : "transparent"
									} h-1 ${index === 0 ? "rounded-l" : ""} w-full`}
								/>

								{showMilestone && (
									<>
										{highlightMilestone ? (
											<div className="bg-cuda-500 p-2 rounded-full -mx-1" />
										) : (
											<div className="bg-slate-200 p-2 rounded-full -mx-1" />
										)}
									</>
								)}
							</div>
						</>
					);
				})}
		</div>
	);
};
