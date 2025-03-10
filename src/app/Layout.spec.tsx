import { expect, test } from '@playwright/experimental-ct-react';
import { Layout } from './Layout';

test('should work', async ({ mount }) => {
	const component = await mount(<Layout />);
	await expect(component).toBeAttached();
});
