import unittest

from mihomo_updater.renderers import (
    render_js_array_entries,
    render_js_object_entries,
    render_yaml_fake_ip_filter_block,
)


class RendererSnapshotTests(unittest.TestCase):
    def test_render_yaml_fake_ip_filter_block_empty_list(self) -> None:
        rendered = render_yaml_fake_ip_filter_block([])
        self.assertEqual(rendered, "  fake-ip-filter: []")

    def test_render_yaml_fake_ip_filter_block_snapshot(self) -> None:
        rendered = render_yaml_fake_ip_filter_block(["+.m2m", "*.example.test"])
        self.assertEqual(
            rendered,
            '  fake-ip-filter:\n'
            '    - "+.m2m"\n'
            '    - "*.example.test"',
        )

    def test_render_js_array_entries_snapshot(self) -> None:
        rendered = render_js_array_entries(["one", "two"])
        self.assertEqual(rendered, '    "one",\n    "two",')

    def test_render_js_object_entries_snapshot(self) -> None:
        rendered = render_js_object_entries(
            {
                "example.test": ["127.0.0.1", "::1"],
                "enabled": True,
            }
        )
        self.assertEqual(
            rendered,
            '    "example.test": [\n'
            '        "127.0.0.1",\n'
            '        "::1"\n'
            '    ],\n'
            '    "enabled": true,',
        )


if __name__ == "__main__":
    unittest.main()
