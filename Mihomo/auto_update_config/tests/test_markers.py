import unittest

from mihomo_updater.errors import MarkerError
from mihomo_updater.markers import BlockPatch, apply_marker_patches, replace_between_markers


class MarkerPatchTests(unittest.TestCase):
    def test_replace_between_markers_updates_expected_region(self) -> None:
        content = "before\nSTART\nold value\nEND\nafter\n"
        updated = replace_between_markers(content, "START", "END", "new value")
        self.assertEqual(updated, "before\nSTART\nnew value\nEND\nafter\n")

    def test_replace_between_markers_rejects_missing_marker(self) -> None:
        with self.assertRaises(MarkerError):
            replace_between_markers("before\nEND\n", "START", "END", "value")

    def test_replace_between_markers_rejects_duplicate_marker(self) -> None:
        with self.assertRaises(MarkerError):
            replace_between_markers("START\nSTART\nEND\n", "START", "END", "value")

    def test_replace_between_markers_rejects_invalid_order(self) -> None:
        with self.assertRaises(MarkerError):
            replace_between_markers("END\nSTART\n", "START", "END", "value")

    def test_apply_marker_patches_keeps_text_when_replacement_matches(self) -> None:
        content = "A\nSTART\nvalue\nEND\nB\n"
        updated = apply_marker_patches(
            content,
            [BlockPatch(start_marker="START", end_marker="END", replacement="value")],
        )
        self.assertEqual(updated, content)

    def test_replace_between_markers_preserves_indented_end_marker(self) -> None:
        content = "root\n    // START\n    old\n    // END\n"
        updated = replace_between_markers(content, "// START", "// END", '    "new"')
        self.assertEqual(updated, 'root\n    // START\n    "new"\n    // END\n')


if __name__ == "__main__":
    unittest.main()
