/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	Dropdown,
	IconButton,
	Persona,
	PersonaSize,
	Pivot,
	PivotItem,
} from '@fluentui/react'
import { observer } from 'mobx-react-lite'
import { Switch, Route, Redirect } from 'react-router-dom'
import { setCurrentLanguage } from '../mutators/repoMutators'
import {
	isUserAuthenticated,
	isUserAuthorized,
} from '../selectors/authSelectors'
import { getAppStore } from '../store/store'
import { getLanguageDisplayText } from '../utils/textUtils'
import Dashboard from './Dashboard'
import { Footer } from './Footer'
import Locations from './Locations'
import Login from './Login'
import QualifierPanel from './QualifierPanel'
import Translate from './Translate'

import './App_reset_styles.scss'
import './App.scss'

export default observer(function App() {
	const state = getAppStore()

	const languageKeys = 'en-us,ko-kr,vi-vn,zh-cn,es-us,de-de,es-es,fi-fi,fr-fr,he-il,it-it,ja-jp,pt-pt,sv-se,th-th'.split(
		','
	)

	const languageOptions = languageKeys.map((key) => {
		return {
			key: key,
			text: getLanguageDisplayText(key, key),
		}
	})

	return (
		<div className="rootContentWrapper">
			{isUserAuthenticated() ? (
				<>
					<Switch>
						<Route exact path="/">
							<div className="appPageContainer">
								<div className="appHeaderWrapper">
									<div className="appHeaderContainer">
										<IconButton
											iconProps={{ iconName: 'waffle' }}
											title="Apps"
											styles={{
												icon: { fontSize: '24px', color: 'white' },
												rootHovered: { backgroundColor: 'transparent' },
												rootPressed: { backgroundColor: 'transparent' },
											}}
										/>
										<div className="appHeaderTitle">Data Composer</div>
									</div>
									<div className="appHeaderPersona">
										<div>
											<Dropdown
												defaultSelectedKey={state.currentLanguage}
												onChange={(e, o) => setCurrentLanguage(o)}
												ariaLabel="Pick Language"
												options={languageOptions}
												styles={{
													dropdown: { border: 'none' },
													title: {
														fontSize: '14px',
														color: 'white !important',
														border: 'none',
														backgroundColor: 'transparent',
													},
													caretDown: {
														color: 'white !important',
														fontSize: '14px',
													},
													dropdownOptionText: { fontSize: '14px' },
													root: {
														selectors: {
															':hover': {
																backgroundColor: 'rgba(0,0,0,.25);',
															},
														},
													},
												}}
											/>
										</div>
										<div className="appHeaderUsername">
											{state.userDisplayName}
										</div>
										<Persona
											text={state.userDisplayName}
											size={PersonaSize.size32}
											hidePersonaDetails={true}
										/>
									</div>
								</div>
								<div className="appBodyWrapper">
									{isUserAuthorized() ? (
										<>
											<div className="appBodyLeft">
												<Pivot>
													<PivotItem headerText="Dashboard">
														<Dashboard />
													</PivotItem>
													<PivotItem headerText="Locations">
														<Locations />
													</PivotItem>
													<PivotItem headerText="Translate">
														<Translate />
													</PivotItem>
												</Pivot>
											</div>
											{state.toggleQualifier && (
												<div className="appBodyRight">
													<QualifierPanel />
												</div>
											)}
										</>
									) : (
										<div className="appBodyLeft">
											<div className="dashboardPageWrapper">
												<div className="bodyContainer">
													<div className="bodyHeader">
														<div className="bodyHeaderTitle">
															<div className="mainTitle">Welcome!</div>
														</div>
													</div>
												</div>
												<section style={{ width: '70%', margin: '0px auto' }}>
													<p>
														Thank you for your interest in helping to manage the
														data, unfortunately right now access to this tool
														requires collaborator permissions on{' '}
														<a
															target="_blank"
															rel="noreferrer"
															href={`https://www.github.com/${process.env.REACT_APP_REPO_OWNER}/${process.env.REACT_APP_REPO_NAME}`}
														>
															this repo
														</a>
														. Feel free to request access over on GitHub!
													</p>
												</section>
											</div>
										</div>
									)}
								</div>
							</div>
						</Route>
						<Route path="*">
							<div>404 page not found.</div>
						</Route>
					</Switch>
				</>
			) : (
				<Switch>
					<Route exact path="/">
						<Login />
					</Route>
					<Route path="*">
						<Redirect to="/" />
					</Route>
				</Switch>
			)}
			<Footer />
		</div>
	)
})
