/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { IconButton, Persona, PersonaSize, Dropdown } from '@fluentui/react'
import { observer } from 'mobx-react-lite'
import { useState, useCallback } from 'react'
import { setCurrentLanguage } from '../mutators/repoMutators'
import { getAppStore } from '../store/store'
import { getLanguageDisplayText } from '../utils/textUtils'
import LocationsRegions from './LocationsRegions'
import LocationsStates from './LocationsStates'
import QualifierPanel from './QualifierPanel'

import './Dashboard.scss'

export default observer(function Dashboard() {
	const [selectedState, setSelectedState] = useState<any>(null)
	const state = getAppStore()

	const onNavigateBack = useCallback(() => {
		setSelectedState(null)
	}, [])

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
		<div className="dashboardPageContainer">
			<div className="dashboardHeaderWrapper">
				<div className="headerContainer">
					<IconButton
						iconProps={{ iconName: 'waffle' }}
						title="Apps"
						styles={{
							icon: { fontSize: '24px', color: 'white' },
							rootHovered: { backgroundColor: 'transparent' },
							rootPressed: { backgroundColor: 'transparent' },
						}}
					/>
					<div className="headerTitle">Covid-19 Vaccine Policy Composer</div>
				</div>
				<div className="headerPersona">
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
								caretDown: { color: 'white !important', fontSize: '14px' },
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
					<div className="headerUsername">{state.userDisplayName}</div>
					<Persona
						text={state.userDisplayName}
						size={PersonaSize.size32}
						hidePersonaDetails={true}
					/>
				</div>
			</div>

			<div className="dashboardBodyWrapper">
				<div className="dashboardBodyLeft">
					{!selectedState ? (
						<LocationsStates onSelectedItem={setSelectedState} />
					) : (
						<LocationsRegions
							selectedState={selectedState}
							onNavigateBack={onNavigateBack}
						/>
					)}
				</div>
				{state.toggleQualifier && (
					<div className="dashboardBodyRight">
						<QualifierPanel />
					</div>
				)}
			</div>
		</div>
	)
})
