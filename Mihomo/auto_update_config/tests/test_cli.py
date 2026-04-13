import io
import unittest
from contextlib import redirect_stdout
from unittest.mock import patch

from mihomo_updater import cli
from mihomo_updater.errors import UpdaterError
from mihomo_updater.updater import UpdateSummary


class CliTests(unittest.TestCase):
    def test_main_prints_updated_status(self) -> None:
        summary = UpdateSummary(updated_files=(), unchanged_files=())
        with patch.object(cli, "MihomoUpdater") as updater_cls:
            updater_cls.return_value.update.return_value = summary
            buffer = io.StringIO()
            with redirect_stdout(buffer):
                exit_code = cli.main(["--target", "config"])

        self.assertEqual(exit_code, 0)
        self.assertIn("status: unchanged", buffer.getvalue())

    def test_main_returns_non_zero_on_error(self) -> None:
        with patch.object(cli, "MihomoUpdater") as updater_cls:
            updater_cls.return_value.update.side_effect = UpdaterError("boom")
            buffer = io.StringIO()
            with redirect_stdout(buffer):
                exit_code = cli.main(["--target", "script"])

        self.assertEqual(exit_code, 1)
        self.assertIn("error: boom", buffer.getvalue())


if __name__ == "__main__":
    unittest.main()
