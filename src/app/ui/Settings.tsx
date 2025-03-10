import { ArrowsRotateLeft, Moon, Sun } from '@gravity-ui/icons';
import { Settings as GravitySettings } from '@gravity-ui/navigation';
import { Icon, SegmentedRadioGroup } from '@gravity-ui/uikit';
import { useLocalStorage } from 'usehooks-ts';

export interface SettingsProps {
	compact: boolean;
}

export const Settings = () => {
	const [theme = 'system', setTheme] = useLocalStorage('theme', 'system');

	return (
		<GravitySettings title="Настройки" filterPlaceholder="Поиск">
			<GravitySettings.Page title="Внешний вид">
				<GravitySettings.Section title="Интерфейс">
					<GravitySettings.Item title="Тема интерфейса">
						<SegmentedRadioGroup size="l" value={theme} onUpdate={setTheme}>
							<SegmentedRadioGroup.Option value="system">
								<Icon data={ArrowsRotateLeft} />
							</SegmentedRadioGroup.Option>
							<SegmentedRadioGroup.Option value="light">
								<Icon data={Sun} />
							</SegmentedRadioGroup.Option>
							<SegmentedRadioGroup.Option value="dark">
								<Icon data={Moon} />
							</SegmentedRadioGroup.Option>
						</SegmentedRadioGroup>
					</GravitySettings.Item>
				</GravitySettings.Section>
			</GravitySettings.Page>
		</GravitySettings>
	);
};
