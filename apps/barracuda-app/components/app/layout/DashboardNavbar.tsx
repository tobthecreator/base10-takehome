import { UserButton } from "@clerk/nextjs";
import { Link } from "../generic/Link";

const DashboardNavbar = () => {
	return (
		<nav id="nav">
			<div
				className={`relative z-50 flex w-full h-12 items-center min-w-0 justify-between pr-4 border border-b border-slate-200 bg-slate-100`}
			>
				<div className="flex items-center justify-start min-w-0">
					<div className="w-16 2xl:w-56 pl-4 flex items-center gap-2">
						{/* {showSidebarButton && (
                    <div className="block md:hidden">
                        <ShowSidebarbutton />
                    </div>
                )} */}
						<Link href="/">
							<>
								<span className="sr-only">Barracuda Logo</span>
								<div className="hidden 2xl:flex">
									logo
									{/* <CudaLogo className="h-5" /> */}
								</div>
								<div className="flex 2xl:hidden">
									icon
									{/* <CudaIcon size="h-6" /> */}
								</div>

								{/* <CudaIcon size="w-8 h-8 sm:hidden" /> */}
							</>
						</Link>
					</div>

					{/* <button
                onClick={() => {
                    dispatch(ToggleGlobalCommandPalette({ isOpen: true }));
                }}
                className="hidden md:flex items-center text-left truncate min-w-0 text-sm gap-2 border border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white text-slate-400 h-8 px-2 rounded-md "
            >
                <HiSearch className="w-4 h-4" />
                <span className="grow truncate">
                    Search contacts, organizations, opportunties...
                </span>
                <div className="flex items-center ml-2">
                    <div className="text-xs rounded-sm bg-slate-100 text-slate-500 px-1 py-px">
                        ⌘
                    </div>
                    <div className="text-xs rounded-sm bg-slate-100 text-slate-500 px-1 py-px">
                        K
                    </div>
                </div>
            </button> */}
				</div>

				<div className="inline-flex justify-center items-center gap-x-2 sm:gap-x-5 lg:gap-x-8">
					<div className="flex gap-4 items-center">
						<UserButton />
						{/* <CreateButton /> */}
						{/* <IconButton
							onClick={() => {
								alert("search");
								// dispatch(ToggleGlobalCommandPalette({ isOpen: true }));
							}}
							size="small"
							icon={<HiSearch className="w-4 h-4 text-slate-600" />}
							className={"flex md:hidden mr-1"}
						/> */}
						{/* <Wish /> */}
						{/* <HelpButton /> */}
						{/* {!userIsLoading && user && (
                    <>
                        <Menu
                            as="div"
                            className="-ml-1 relative flex text-left items-center "
                        >
                            {({ open }) => (
                                <>
                                    <Menu.Button>
                                        <img
                                            className={`w-8 h-8 flex-none rounded-full border-2 border-slate-100 hover:opacity-80 object-cover ${
                                                open && "outline outline-2 outline-cuda-500"
                                            }`}
                                            src={
                                                (user.images && user.images.profile) ??
                                                "/Default_PFP.png"
                                            }
                                        />
                                    </Menu.Button>

                                    <Transition
                                        show={open}
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items
                                            className="py-2 top-full mt-1 -mr-1 absolute right-0 w-64 rounded-lg shadow-xl bg-white border-slate-200 border"
                                            static
                                        >
                                            <Menu.Item>
                                                <>
                                                    <UserDisplay
                                                        user={user}
                                                        imageSize={"w-10 h-10"}
                                                        className="px-4 py-2"
                                                    />
                                                </>
                                            </Menu.Item>
                                            {(["dev", "staging"].includes(
                                                process.env
                                                    .NEXT_PUBLIC_AUTOMATIC_MONGODB_DATABASE ?? ""
                                            ) ||
                                                currentProject?.username === "barracuda") && (
                                                <>
                                                    <div className="py-2">
                                                        <Divider
                                                            borderColor="border-slate-100"
                                                            className="w-full"
                                                        />
                                                    </div>
                                                    <div className={"px-2"}>
                                                        <MyProjectsDropdown user={user} />
                                                    </div>
                                                </>
                                            )}
                                            <div className="py-2">
                                                <Divider
                                                    borderColor="border-slate-100"
                                                    className="w-full"
                                                />
                                            </div>
                                            <Menu.Item
                                                onClick={toggleEditUserAccount}
                                                as={"div"}
                                                className={"px-2"}
                                            >
                                                <div className="hover:bg-slate-100 rounded-lg px-4 py-2 cursor-pointer text-slate-500 text-sm tracking-wide">
                                                    Account Settings
                                                </div>
                                            </Menu.Item>

                                            <Menu.Item
                                                onClick={() => logoutUser()}
                                                as={"div"}
                                                className={"px-2"}
                                            >
                                                <div className="hover:bg-slate-100 rounded-lg px-4 py-2 cursor-pointer text-slate-500 text-sm tracking-wide">
                                                    Sign Out
                                                </div>
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </>
                            )}
                        </Menu>
                        {editUserAccountIsOpen && (
                            <UserSettingsModal
                                isOpen={editUserAccountIsOpen}
                                onDismiss={toggleEditUserAccount}
                                view={defaultUserSettingsView}
                            />
                        )}
                    </>
                )} */}
					</div>
				</div>
			</div>

			{/* <Modal
        width="w-full max-w-xl"
        height="h-max max-h-full"
        isOpen={loginUserModalIsOpen}
        onDismiss={toggleLoginUserModal}
    >
        <BaseOnboardingFlowWrapper>
            <LoginFlow onFinished={toggleLoginUserModal} />
        </BaseOnboardingFlowWrapper>
    </Modal>
    <EarlyAccessModal
        signupModalOpen={signupModalOpen}
        setSignupModalOpen={setSignupModalOpen}
        meta={{ location: `${router.pathname} - Navbar` }}
    /> */}
		</nav>
	);
};

export default DashboardNavbar;
